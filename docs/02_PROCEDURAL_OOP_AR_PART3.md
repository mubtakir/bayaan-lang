# دليل لغة البيان - الجزء الثاني (الجزء 3): البرمجة الكائنية (OOP)

<div dir="rtl">

> هذا الجزء سيضم الأصناف، الوراثة (C3 MRO)، super()، والتعدد الشكلي.

(قريبًا) سيتم نقل المادة التفصيلية والأمثلة.



> التنقل السريع: [PART1](02_PROCEDURAL_OOP_AR_PART1.md) | [PART2](02_PROCEDURAL_OOP_AR_PART2.md) | [PART3](02_PROCEDURAL_OOP_AR_PART3.md) | [PART4](02_PROCEDURAL_OOP_AR_PART4.md)


## 11. الأصناف والكائنات

### 11.1 تعريف صنف بسيط

```bayan
hybrid {
    class Person: {
        def __init__(self, name, age): {
            self.name = name
            self.age = age
        }

        def display(self): {
            print(self.name)
            print(self.age)
        }
    }

    # إنشاء كائن
    person1 = Person("أحمد", 25)
    person1.display()
}
```

### 11.2 الخصائص والطرق

```bayan
hybrid {
    class Student: {
        def __init__(self, name, grade): {
            self.name = name
            self.grade = grade
            self.courses = []
        }

        def add_course(self, course): {
            self.courses.append(course)
        }

        def get_info(self): {
            info = self.name + " - Grade: " + str(self.grade)
            return info
        }
    }

    student = Student("فاطمة", 95)
    student.add_course("رياضيات")
    student.add_course("فيزياء")

    print(student.get_info())
    print(student.courses)
}
```


### 11.3 صنف مع عدة طرق

```bayan
hybrid {
    class BankAccount: {
        def __init__(self, owner, balance): {
            self.owner = owner
            self.balance = balance
        }

        def deposit(self, amount): {
            self.balance = self.balance + amount
            return self.balance
        }

        def withdraw(self, amount): {
            if amount > self.balance: {
                print("رصيد غير كافٍ")
                return self.balance
            }
            self.balance = self.balance - amount
            return self.balance
        }

        def get_balance(self): {
            return self.balance
        }
    }

    account = BankAccount("أحمد", 1000)
    account.deposit(500)
    print(account.get_balance())  # 1500

    account.withdraw(200)
    print(account.get_balance())  # 1300
}
```

---

## 12. الوراثة

### 12.1 وراثة بسيطة

```bayan
hybrid {
    # الصنف الأب
    class Animal: {
        def __init__(self, name): {
            self.name = name
        }

        def speak(self): {
            print("الحيوان يصدر صوتاً")
        }
    }

    # الصنف الابن
    class Dog: {
        def __init__(self, name, breed): {
            self.name = name
            self.breed = breed
        }

        def speak(self): {
            print("الكلب ينبح")
        }
    }

    dog = Dog("ريكس", "جيرمن")
    dog.speak()  # "الكلب ينبح"
}
```

### 12.2 استخدام super()

```bayan
hybrid {
    class Vehicle: {
        def __init__(self, brand, model): {
            self.brand = brand
            self.model = model
        }

        def info(self): {
            return self.brand + " " + self.model
        }
    }

    class Car: {
        def __init__(self, brand, model, doors): {
            self.brand = brand
            self.model = model
            self.doors = doors
        }

        def info(self): {
            base_info = self.brand + " " + self.model
            return base_info + " - Doors: " + str(self.doors)
        }
    }

    car = Car("تويوتا", "كامري", 4)
    print(car.info())
}
```


### 12.3 الوراثة المتعددة

```bayan
hybrid {
    class Flyable: {
        def fly(self): {
            print("يطير")
        }
    }

    class Swimmable: {
        def swim(self): {
            print("يسبح")
        }
    }

    class Duck: {
        def __init__(self, name): {
            self.name = name
        }

        def fly(self): {
            print("البطة تطير")
        }

        def swim(self): {
            print("البطة تسبح")
        }
    }

    duck = Duck("دونالد")
    duck.fly()
    duck.swim()
}
```

---

## 13. التغليف

### 13.1 خصائص خاصة (Private)

```bayan
hybrid {
    class BankAccount: {
        def __init__(self, balance): {
            self.__balance = balance  # خاصية خاصة
        }

        def get_balance(self): {
            return self.__balance
        }

        def set_balance(self, amount): {
            if amount >= 0: {
                self.__balance = amount
            }
        }
    }

    account = BankAccount(1000)
    print(account.get_balance())  # 1000

    account.set_balance(2000)
    print(account.get_balance())  # 2000
}
```

---

## 14. تعدد الأشكال

### 14.1 Polymorphism الأساسي

```bayan
hybrid {
    class Shape: {
        def area(self): {
            return 0
        }
    }

    class Rectangle: {
        def __init__(self, width, height): {
            self.width = width
            self.height = height
        }

        def area(self): {
            return self.width * self.height
        }
    }

    class Circle: {
        def __init__(self, radius): {
            self.radius = radius
        }

        def area(self): {
            return 3.14 * self.radius * self.radius
        }
    }

    rect = Rectangle(5, 10)
    print(rect.area())  # 50

    circle = Circle(7)
    print(circle.area())  # 153.86
}
```
