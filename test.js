var webdriver = require('selenium-webdriver');
var chromedriver = require('chromedriver');
var driver = new webdriver.Builder()
  
var assert = require('assert');
var http = require('http');
var fs = require('fs'); 


describe('Test SoftBox', function(driver) {
    driver
    chromedriver.start();
    context('Scenario: success', function() {
    describe('Test 1', function() {
    it('Acesso ao Redmine', function() {
        http.get('http://demo.redmine.org/', function(res){
           done();
           }).on('error', function(e){
                assert.fail(e);
        });
        
    });

    it('Cadastro e Usuário e Validação Cadastro',function(){
        
        http.get('http://demo.redmine.org/', function(res){
            res  
            .click('a[href="/account/register"]')
            .setValue('user[login]', 'teste')
            .setValue('user[password]', '123456')
            .setValue('user[password_confirmation]', '123456')
            .setValue('user[firstname]', 'José')
            .setValue('user[firstname]', 'Silva')
            .setValue('user[user[mail]]', 'teste@teste.com.br')
            .click('button[name=commit]')
            .pause(1000)
            .assert.containsText('flash notice', 'Sua conta foi ativada. Você pode acessá-la agora.',)
            .click('a[href="/logout"]')
        })
    });
    
    it('Login e Validação de Login', function(){
        http.get('http://demo.redmine.org/', function(res){
            res
            .click('a[href="/login"]')
            .waitForElementVisible('button[name=login]', 5000)
            .setValue('username', 'teste')
            .setValue('password', '123456')
            .click('button[name=login]')
            .pause(5000)	
            .assert.containsText('user active', 'teste',)
	    })
    })

    it('Criando Novo Projeto e Validação da Criação', function(){
        http.get('http://demo.redmine.org/', function(res){
            res
            .click('a[href="/projects"]')
            .waitForElementVisible('a[href="/projects/new"]', 5000)
            .click('a[href="/projects/new"]')
            .waitForElementVisible('button[name=commit]', 5000)
            .setValue('project[name]', 'Projeto Teste SoftBox')
            query = '//input[@type="checkbox" and @value="2"]';
            browser.useXpath()
            .waitForElementVisible(query, 5000)
            .click(query)
            .pause(5000)
            query = '//input[@type="checkbox" and @value="3"]';
            browser.useXpath()
            .waitForElementVisible(query, 5000)
            .click(query)
            .pause(5000)
            .click('button[name=submit]')
            .pause(5000)
            .assert.containsText('flash notice','Criado com sucesso.',)
       })
    })

    it('Criando 30 tarefas com arquivo JSON', function(){
        var dataJson = fs.readFileSync('./DadosTarefas.json', 'utf-8');
        var dados = JSON.parse(dataJson);
        http.get('http://demo.redmine.org/projects/projeto-teste-softbox/settings', function(res){
            res
		    dados.forEach(function (obj){
			 client
                .click('a[href="/projects/projeto-teste-softbox/issues/new"]')
                .waitForElementVisible('body', 1000)
                .assert.visible('issue[subject]')
                .setValue('issue[subject]', obj.Titulo)
                .waitForElementVisible('button[name=commit]', 1000)
                .click('button[name=continue]')
                .pause(5000)
                .end();
		});
        })
    })
    it('Realizar Paginação e Comparar com o Arquivo JSON', function(){       
        var dataJson = fs.readFileSync('./ValidacaoTarefas.json', 'utf-8');
        var dados = JSON.parse(dataJson); 
        http.get('http://demo.redmine.org/projects/projeto-teste-softbox/issues', function(res){
            res    
            .click('a[href="/projects/projeto-teste-softbox/issues?page=2"]')
            .click('a href="/issues/215391">215391</a')
            var dados = JSON.parse('{"tracker":"Feature","status": "New","priority":"Normal","Titulo":"Tarefa 2"}');
            document.getElementById("215391").innerHTML = dados.tracker + ", " + dados.status + ","
            dados.priority +"," + dados.Titulo +"";                   
        }) 
        chromedriver.stop();  
    }) 
})
})
});

