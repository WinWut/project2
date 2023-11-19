radio.onReceivedNumber(function (receivedNumber) {
    gunstate = receivedNumber
})
function game2 () {
    radio.setGroup(105)
    Xpos = 2
    Ypos = 4
    led.plot(Xpos, Ypos)
    if (input.buttonIsPressed(Button.A)) {
        led.unplot(Xpos, Ypos)
        Xpos += -1
        led.plot(Xpos, Ypos)
        if (Xpos == -1) {
            Xpos = 4
        }
    }
    if (input.buttonIsPressed(Button.B)) {
        led.unplot(Xpos, Ypos)
        Xpos += 1
        led.plot(Xpos, Ypos)
        if (Xpos == 5) {
            Xpos = 0
        }
    }
    if (input.buttonIsPressed(Button.AB)) {
        xgunpos = Xpos
        ygunpos = 3
        while (true) {
            led.plot(xgunpos, ygunpos)
            basic.pause(100)
            led.unplot(xgunpos, ygunpos)
            ygunpos += -1
            if (ygunpos == -1) {
                radio.sendNumber(xgunpos)
                radio.sendString("Sent")
                break;
            }
        }
    }
}
// ฟังก์ชันเกมทายตัวเลข
function game1 () {
    // ตั้งค่าgroupให้ตรงกัน
    radio.setGroup(101)
    // สุ่มตัวเลขจาก1ถึง5
    numberreal = randint(1, 5)
    predictnum = 1
    radio.sendNumber(1)
    while (true) {
        basic.showNumber(predictnum)
        if (predictnum == 0) {
            predictnum = 5
        }
        if (predictnum == 6) {
            predictnum = 1
        }
        if (input.buttonIsPressed(Button.A)) {
            predictnum += -1
        }
        if (input.buttonIsPressed(Button.B)) {
            predictnum += 1
        }
        // ยืนยันการเลือกตัวเลขที่เราทาย
        if (input.buttonIsPressed(Button.AB)) {
            // เมื่อค่าตัวเลขที่เราทาย เท่ากับ ค่าตัวเลขที่ถูกสุ่มจะทำการ send string ไปยังอีกเครื่อง แสดงข้อความ ว่า ."lose" แสดงในเครื่องเราว่า "Win"
            if (predictnum == numberreal) {
                radio.sendValue("name", 0)
                basic.showString("Win")
                break;
            } else {
                basic.showIcon(IconNames.Sad)
                basic.pause(1000)
            }
        }
    }
}
function setupping () {
    basic.showNumber(game3)
    if (input.buttonIsPressed(Button.A)) {
        game3 += -1
    }
    if (input.buttonIsPressed(Button.B)) {
        game3 += 1
    }
    if (input.buttonIsPressed(Button.AB)) {
        setup = 0
        basic.clearScreen()
    }
    if (game3 == 0) {
        game3 = 3
    }
    if (game3 == 4) {
        game3 = 1
    }
}
radio.onReceivedString(function (receivedString) {
    if (true) {
        basic.showString(receivedString)
        basic.clearScreen()
    }
})
radio.onReceivedValue(function (name, value) {
    basic.showIcon(IconNames.Sad)
})
let predictnum = 0
let numberreal = 0
let ygunpos = 0
let xgunpos = 0
let Ypos = 0
let Xpos = 0
let gunstate = 0
let game3 = 0
let setup = 0
// กำหนดสถานะsetupเท่ากับ 1
setup = 1
// กำหนดค่าเริ่มต้นของเกมที่เลือกเท่ากับ 0
game3 = 1
basic.forever(function () {
    if (setup == 1) {
        setupping()
    } else if (game3 == 1) {
        game1()
    } else if (game3 == 2) {
        game2()
    } else if (false) {
    	
    } else if (false) {
    	
    } else {
    	
    }
    basic.pause(1000)
})
