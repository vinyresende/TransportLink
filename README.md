# TransportLink 🚌

WebApp pessoal criado para facilitar meu trabalho na Secretaria Municipal de Educação, ajudando no cadastro e gerenciamento de rotas e usuários do transporte escolar.

## 🖼️ Visualização

![TransportLink_visualização](https://www.vinnyy.dev/TransportLink.png)

---

## 🛠️ Tecnologias Utilizadas

O projeto é desenvolvido em `Next.js` com TypeScript, e conta com várias bibliotecas incríveis:

- `Next-Auth` - Cuida da autenticação de usuários
- `Sequelize` - Gerencia nosso banco de dados
- `MySQL` - Banco de dados relacional
- `React-Icons` - Ícones para deixar a interface mais bonita
- `TailwindCSS` - Estilização das páginas
- `Framer-Motion` - Animações suaves

## ⚡ Funcionalidades

Atualmente o projeto tem:

🔐 **Sistema de login seguro** com banco de dados, garantindo que apenas pessoas autorizadas acessem as informações

📝 **CRUD completo** de rotas de transporte - criar, visualizar, editar e excluir

📄 **Geração de fichas personalizadas** em formato `.docx` preenchidas automaticamente com os dados salvos

💡 *Observação:* Como é uma aplicação em fase inicial, focada em aprendizado e agilizar meu trabalho, todas as funções do back-end são feitas com `Server Actions`. Mas planejo criar uma API com `Express` em breve!

## ⚙️ Configuração do Ambiente

Para rodar o projeto, você precisa configurar essas variáveis no arquivo `.env`:

```env
DB_HOST=HOST_DO_BANCO
DB_NAME=NOME_DO_BANCO
DB_USER=USUARIO
DB_PASS=SENHA

ADMIN_KEY=TOKEN_SUPER_SECRETO

NEXTAUTH_URL=http://url-do-app/
NEXTAUTH_SECRET=OUTRO_TOKEN_SECRETO
```

## 👤 Cadastro de Usuários

Como é uma aplicação privada, o cadastro de novos usuários é restrito! Só é possível através de uma requisição HTTP específica:

```.rest
POST /api/auth/register
x-api-key: {{ADMIN_KEY}}

{
    "username": "seu_nome_de_usuario",
    "email": "seu@email.com",
    "password": "sua_senha_secreta"
}
```

---

<div align="center">
  <br />
  <strong>Feito com 💜 e muito café ☕</strong>
  <br />
  <strong>por: Vinícius Resende</strong>
</div>
