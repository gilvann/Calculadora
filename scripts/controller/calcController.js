class CalcController{
    constructor(){
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
    

    initButtonsEvents(){
        //Selecionando todos os (g) de buttons e parts
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        //Percorrendo o querySelectorALL para adiionar o evento de click em cada botão
        buttons.forEach((btn, index)=>{
            this.addEventListenerAll('click drop mouseover', e=>{
                //Pegando o nome de classe de cada botão e depois tirando o (BTN-) para deixar apenas o nome do botão
                console.log(btn.className.baseVal.replace('btn-', ''));
            })
        })
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