import { UsuarioService } from './registra-usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from './registra-usuario/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
/**modelo de clve**/
  user={
    usuario:'',
    password:''
  }
  usuarioServiceS: Usuario;
  /** muestra el campo faltante **/
  campo: string;

  constructor(private router: Router, private toastController: ToastController, private usuarioService: UsuarioService) { }

  ngOnInit() {
  }
  ingresar(){
    /** declaracion de navegacion extra **/
    const NavigationExtras: NavigationExtras = {
      state: {
        /**asignacion de clave y valor */
        user: this.user
      }
    };
    if(this.validateModel(this.user)){
      this.usuarioServiceS=this.usuarioService.getUsuario(this.user.usuario);
      if(this.usuarioService.getUsuario(this.user.usuario).password === this.user.password){
        this.router.navigate(['/contactos'],NavigationExtras);
      }else{
        this.presentToast('Usuario o contraseña no valida');
      }
    }else
    {
      this.presentToast('Falta completar: '+this.campo);
    }
  }
/** muestra un mensaje y duracion al usuario **/
  @param message
  @param duration

  async presentToast(message: string, duration?: number){
    const toast = await this.toastController.create(
      {
        message,
        duration:duration?duration:2000
      }
    );
    toast.present();
  }
  /** validacion de model */

  validateModel(model: any){
    for(const[key, value] of Object.entries(model)){
      /** si un valor es '' retorna falso y avisa */
      if(value===''){
        /**asignacion de campo faltante */
        this.campo=key;
        return false;
      }
    }
    return true;
  }

}
