declare module "next-auth" {
    /**
     * A forma do objeto de usuário retornado no retorno de chamada `profile` dos provedores OAuth,
     * ou o segundo parâmetro do retorno de chamada `session`, ao usar um banco de dados.
     */
    interface User {}
    /**
     * A forma do objeto de conta retornado no retorno de chamada `account` dos provedores OAuth,
     * Geralmente contém informações sobre o provedor que está sendo usado, como tokens OAuth (`access_token`, etc).
     */
    interface Account {}
   
    /**
     * Retornado por `Session`, `auth`, contém informações sobre a sessão ativa.
     */
    interface Session {}
  }
   
   
  declare module "next-auth/jwt" {
    /** Retornado pelo callback `jwt` e `auth`, ao usar sessões JWT */
    interface JWT {
    /** Token de identificação OpenID */
      idToken?: string
    }
  }