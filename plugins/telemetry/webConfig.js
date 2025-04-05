class WebConfigTye{
    static EditArray  = 1;
    static switch = 2;
    static Choosing = 3;
    static text = 4;
    static number = 5;
    static buttom = 6;
}

class WebConfigBuilder{
    constructor(){}
    addEditArray(){}
    addChoosing(){}
    addSwitch(){}
    addText(){}
    addNumber(){}
    addButtom(){}
}

module.exports = {WebConfigTye,WebConfigBuilder};