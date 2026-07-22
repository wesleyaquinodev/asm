Instruções para o Formsubmit

1) Abra o arquivo [index.html](index.html) e localize o formulário de contato (seção `#contato`).

2) Substitua o valor de `action` no elemento `<form>` pelo seu e-mail no Formsubmit, por exemplo:

   https://formsubmit.co/seu-email@exemplo.com

3) Ajuste o valor de `_next` para a URL de agradecimento (p. ex. `https://seudominio.com/obrigado.html`) ou para `#contato` para ficar na mesma página.

4) Teste enviando um formulário. O Formsubmit envia para o e-mail configurado e redireciona para `_next`.

Campos adicionados automaticamente:
- `_subject`: assunto do e-mail
- `_honey`: campo invisível anti-spam (deixe oculto)
- `_captcha`: desativa o captcha se `false` (opcional)

Observação: substitua `your-email@example.com` no `action` pelo seu e-mail real antes de publicar.
