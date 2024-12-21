/**
 * Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
 * @param {*} n
 */
function isInteger(n) {
    return (n | 0) === n;
}

/**
 * Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
 */
function even() {
    return Array.from({length: 10}, (_, i) => (i + 1) * 2);
}

/**
 * Напишите функцию, считающую сумму чисел до заданного используя цикл
 * @param {*} n
 */
function sumTo(n) {
    return (n * (n + 1)) / 2;
}

/**
 * Напишите функцию, считающую сумму чисел до заданного используя рекурсию
 * @param {*} n
 */
function recSumTo(n) {
    return n === 0 ? 0 : n + recSumTo(n - 1);
}

/**
 * Напишите функцию, считающую факториал заданного числа
 * @param {*} n
 */
function factorial(n) {
    return n === 0 ? 1 : n * factorial(n - 1);
}

/**
 * Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
 * @param {*} n
 */
function isBinary(n) {
    return n > 0 && (n & (n - 1)) === 0;
}

/**
 * Напишите функцию, которая находит N-е число Фибоначчи
 * @param {*} n
 */
function fibonacci(n) {
    if (n <= 1) return n;
    let a = 0,
        b = 1;
    for (let i = 2; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    return b;
}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn) {
    let storedValue = initialValue;
    return (newValue) => {
        return operatorFn ? (storedValue = operatorFn(storedValue, newValue)) : storedValue;
    };
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start = 0, step = 1) {
    return () => {
        const current = start;
        start += step;
        return current;
    };
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp и т.п.) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(firstObject, secondObject) {
    if (firstObject === secondObject) return true;

    if (typeof firstObject === 'number' && typeof secondObject === 'number') {
        return isNaN(firstObject) && isNaN(secondObject);
    }

    if (
        firstObject === null ||
        secondObject === null ||
        typeof firstObject !== 'object' ||
        typeof secondObject !== 'object'
    ) {
        return false;
    }

    if (Array.isArray(firstObject) && Array.isArray(secondObject)) {
        return (
            firstObject.length === secondObject.length &&
            firstObject.every((value, index) => deepEqual(value, secondObject[index]))
        );
    }

    if (Array.isArray(firstObject) || Array.isArray(secondObject)) return false;

    const keysA = Object.keys(firstObject),
        keysB = Object.keys(secondObject);

    return (
        keysA.length === keysB.length &&
        keysA.every((key) => keysB.includes(key) && deepEqual(firstObject[key], secondObject[key]))
    );
}

module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};
