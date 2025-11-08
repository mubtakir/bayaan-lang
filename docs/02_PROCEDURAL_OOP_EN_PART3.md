# Bayan Tutorial (EN) — Part 2.C: Procedural & OOP — Part 3 (OOP)

> Quick Nav: [PART1](02_PROCEDURAL_OOP_EN_PART1.md) | [PART2](02_PROCEDURAL_OOP_EN_PART2.md) | [PART3](02_PROCEDURAL_OOP_EN_PART3.md) | [PART4](02_PROCEDURAL_OOP_EN_PART4.md)

## 11) Classes & Objects
```bayan
hybrid {
    class Person: {
        def __init__(self, name, age): { self.name = name; self.age = age }
        def info(self): { return self.name + ": " + str(self.age) }
    }
    p = Person("Ali", 30)
    print(p.info())
}
```

## 12) Inheritance
```bayan
hybrid {
    class Animal: { def speak(self): { print("...") } }
    class Dog(Animal): { def speak(self): { print("Woof") } }
    d = Dog()
    d.speak()
}
```

### 12.2 super()
```bayan
hybrid {
    class Base: { def greet(self): { print("Base") } }
    class Sub(Base): {
        def greet(self): { super().greet(); print("Sub") }
    }
    s = Sub(); s.greet()
}
```

### 12.3 Multiple Inheritance (Duck example)
```bayan
hybrid {
    class Flyable: { def fly(self): { print("flying") } }
    class Swimmable: { def swim(self): { print("swimming") } }
    class Duck(Flyable, Swimmable): { def __init__(self, name): { self.name = name } }

    duck = Duck("Daffy"); duck.fly(); duck.swim()
}
```

## 13) Encapsulation
```bayan
hybrid {
    class BankAccount: {
        def __init__(self, balance): { self.__balance = balance }
        def get_balance(self): { return self.__balance }
        def set_balance(self, amount): { if amount >= 0: { self.__balance = amount } }
    }
    acc = BankAccount(1000)
    print(acc.get_balance())
    acc.set_balance(2000)
    print(acc.get_balance())
}
```

## 14) Polymorphism
```bayan
hybrid {
    class Shape: { def area(self): { return 0 } }
    class Rectangle: { def __init__(self, w, h): { self.w = w; self.h = h } def area(self): { return self.w * self.h } }
    class Circle: { def __init__(self, r): { self.r = r } def area(self): { return 3.14 * self.r * self.r } }
    print(Rectangle(4, 5).area())
    print(Circle(3).area())
}
```

