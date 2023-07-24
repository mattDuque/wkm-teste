# README
##Instruções para rodar
  1. Clone o aplicativo em um ambiente Linux ou WSL para evitar problemas com line endings
  2. Certifique-se que além do Ruby, tenha rails, mysql e node18 instalados
  3. rode os commandos:
     
  Criar a base de dados
```
rails db:create
```
  Fazer a migração
```
rails db:migrate 
```
  Seed dos dados 
```
rails db:seed
```
  Instalar as dependencias do frontend
```
yarn install
```
  Rodar o aplicativo
```
bin/dev
```
