import { SettingsService, _HttpClient } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
// import {
  // TokenService,
  // DA_SERVICE_TOKEN,
// } from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import { StartupService } from '@core/startup/startup.service';
import { HttpClient } from '@angular/common/http';
import { Config } from '@config/config';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [],
})
export class UserLoginComponent implements OnInit, OnDestroy {
  @ViewChild('pCaptcha') pCaptcha;

  form: FormGroup;
  error = '';

  constructor(
    fb: FormBuilder,
    modalSrv: NzModalService,
    public msg: NzMessageService,
    private router: Router,
    private settingsService: SettingsService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    // @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
    private startupSrv: StartupService,
    public http: HttpClient,
  ) {
    this.form = fb.group({
      userName: [null, [Validators.required, Validators.minLength(5)]],
      password: [null, Validators.required],
      captcha: [null, [Validators.required, Validators.pattern(/^\-?[0-9]+$/)]],
    });
    modalSrv.closeAll();
  }

  // #region fields

  get userName() {
    return this.form.controls.userName;
  }
  get password() {
    return this.form.controls.password;
  }
  get captcha() {
    return this.form.controls.captcha;
  }

  // #endregion

  // 获取图形验证码
  getCaptcha() {
    this.http.get(`${Config.apiUrl}login/captcha`, {withCredentials: true}).subscribe((data: any) => {
      this.pCaptcha.nativeElement.innerHTML = data.data;
    });
  }

  // #endregion

  submit() {
    this.error = '';
    this.userName.markAsDirty();
    this.userName.updateValueAndValidity();
    this.password.markAsDirty();
    this.password.updateValueAndValidity();
    this.captcha.markAsDirty();
    this.captcha.updateValueAndValidity();
    if (this.userName.invalid || this.password.invalid || this.captcha.invalid) return;

    // 默认配置中对所有HTTP请求都会强制 [校验](https://ng-alain.com/auth/getting-started) 用户 Token
    // 然一般来说登录请求不需要校验，因此可以在请求URL加上：`/login?_allow_anonymous=true` 表示不触发用户 Token 校验
    this.http
      .post(`${Config.apiUrl}login`, {
        username: this.userName.value,
        pwd: this.password.value,
        captcha: this.captcha.value,
      }, {withCredentials: true})
      .subscribe((res: any) => {
        // if (res.msg !== 'ok') {
        //   this.error = res.msg;
        //   return;
        // }
        // 清空路由复用信息
        this.reuseTabService.clear();
        this.startupSrv.load().then(() => this.router.navigate(['/']));
        // 设置用户Token信息
        // this.tokenService.set(res.user);
        // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
        // this.startupSrv.load().then(() => this.router.navigate(['/']));
      }, (err: any) => {
        this.error = err.errMsg;
        this.getCaptcha();
      });
  }
  // #endregion

  ngOnInit() {
    this.getCaptcha();
  }

  ngOnDestroy(): void {
    
  }
}
