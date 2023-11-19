def game2():
    global Xgunpos, Ygunpos
    Xgunpos = 2
    Ygunpos = 4
    while True:
        pass
# ฟังก์ชันเกมทายตัวเลข
def game1():
    global numberreal, predictnum, setup
    # ตั้งค่าgroupให้ตรงกัน
    radio.set_group(101)
    # สุ่มตัวเลขจาก1ถึง5
    numberreal = randint(1, 5)
    predictnum = 1
    radio.send_number(1)
    while True:
        basic.show_number(predictnum)
        if predictnum == 0:
            predictnum = 5
        if predictnum == 6:
            predictnum = 1
        if input.button_is_pressed(Button.A):
            predictnum += -1
        if input.button_is_pressed(Button.B):
            predictnum += 1
        # ยืนยันการเลือกตัวเลขที่เราทาย
        if input.button_is_pressed(Button.AB):
            # เมื่อค่าตัวเลขที่เราทาย เท่ากับ ค่าตัวเลขที่ถูกสุ่มจะทำการ send string ไปยังอีกเครื่อง แสดงข้อความ ว่า ."lose" แสดงในเครื่องเราว่า "Win"
            if predictnum == numberreal:
                radio.send_string("Lose")
                basic.show_string("Win")
                break
            else:
                basic.show_icon(IconNames.SAD)
                basic.pause(1000)
    setup = 1
def setupping():
    global game3, setup
    basic.show_number(game3)
    if input.button_is_pressed(Button.A):
        game3 += -1
    if input.button_is_pressed(Button.B):
        game3 += 1
    if input.button_is_pressed(Button.AB):
        setup = 0
        basic.clear_screen()
    if game3 == -1:
        game3 = 3
    if game3 == 4:
        game3 = 1

def on_received_string(receivedString):
    global setup
    basic.show_string(receivedString)
    basic.clear_screen()
    setup = 1
radio.on_received_string(on_received_string)

predictnum = 0
numberreal = 0
Ygunpos = 0
Xgunpos = 0
game3 = 0
setup = 0
# กำหนดสถานะsetupเท่ากับ 1
setup = 1
# กำหนดค่าเริ่มต้นของเกมที่เลือกเท่ากับ 0
game3 = 1

def on_forever():
    global setup
    if setup == 1:
        setupping()
    elif game3 == 1:
        game1()
        setup = 1
    elif game3 == 2:
        game2()
    elif False:
        pass
    elif False:
        pass
    else:
        pass
    basic.pause(1000)
basic.forever(on_forever)
