import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Adicione sua lógica personalizada de autorização aqui, se necessário
    // Por exemplo, você pode verificar permissões do usuário antes de permitir o acesso à rota.
    return super.canActivate(context);
  }
}
