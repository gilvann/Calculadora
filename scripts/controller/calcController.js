class CalcController{
    constructor(){
        this._operation = [];
        this._locale = "pt-BR"
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate; 
        this.initialize();
        this.initButtonsEvents();
    }
    //Funçõa de inicialização
    initialize(){
        //Chamada do Método setDisplayTime que mostra a data e hora
        this.setDisplayTime();
        //Usando o setInterval para chamar o método setDisplayTime para que mostre a hora e atualize ele a cada 1s.
        setInterval(() => {
            this.setDisplayTime();
        }, 1000);
    }
    addEventListenerAll(element, events, fn){
        events.split(' ').forEach(event =>{
            element.addEventListener(event, fn, false);
        });
    }

    //Definindo um array vazio novamente para simular que limpou tudo
    clearAll(){
        this._operation = [];
    }
    //Método POP remove o ultimo elemento do array
    clearEntry(){
        this._operation.pop();
    }
    
    getLastOperation(){
        return this._operation[this._operation.length-1];
    }

    setLastOperation(value){
        this._operation[this._operation.length - 1] = value;
    }

    isOperator(value){
        return (['+', '-', '*', '%', '/'].indexOf(value) > -1)
    }

    //Método PUSH adiciona o elemento na proxima posição do array
    addOperation(value){
        if(isNaN(this.getLastOperation())){
            //String
            if(this.isOperator(value)){
                this.setLastOperation(value);

            }else if (isNaN(value)){
                console.log(value);

            }else{
                this._operation.push(value);

            }
        }else{
            //Number
            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(parseInt(newValue))
        }
        console.log(this._operation);
    }

    setError(){
        this.displayCalc = "Error"
    }

    execBtn(value){
        switch(value){
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                
                break;
            case 'ponto':
                this.addOperation('.');
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
                break;
        }
    }
    

    initButtonsEvents(){
        //Selecionando todos os (g) de buttons e parts
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");        
        //Percorrendo o querySelectorALL para adiionar o evento de click em cada botão
        buttons.forEach((btn, index)=>{
            this.addEventListenerAll(btn, 'click drag', e=>{
                //Pegando o nome de classe de cada botão e depois tirando o (BTN-) para deixar apenas o nome do botão
                let texBtn = btn.className.baseVal.replace('btn-', '');
                //console.log(texBtn);

                this.execBtn(texBtn)

            });

            //Mudando estilo do cursor no eventos de mouser
            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e=>{
                btn.style.cursor = "pointer";
            });
        });
    }



    //Função para mostrar data e hora no display da calculadora
    setDisplayTime(){
        //Mostrando data no displayData e formatando para ser mostrado no padrão local
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            //Mostrando dia com 2 digitos
            day: "2-digit",
            //Mostrando mês por extenso
            month: "long",
            //Mostrando ano com apenas 2 digitos
            year: "2-digit"
        });
        //Mostrando hora no displayTime e formatando para ser mostrado no padrão local
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayTime(){
        return this._timeEl.innerHTML;
    }
    set displayTime(value){
        this._timeEl.innerHTML = value;
    }
    
    get displayDate(){
        return this._dateEl.innerHTML;
    }
    set displayDate(value){
        this._dateEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }
    set currentDate(value){
        this._currentDate = value;
    }
}