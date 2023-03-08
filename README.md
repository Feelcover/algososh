# Проектная работа. МБОУ АЛГОСОШ им. Фибоначчи

 [Дизайн проекта](https://www.figma.com/file/RIkypcTQN5d37g7RRTFid0/Algososh_external_link?node-id=0%3A1)

 [Ссылка на просмотр работы](https://feelcover.github.io/algososh/)

## Строка


![Начальное состояние страницы](README_static/Untitled.png)

Начальное состояние страницы

Введите текст в инпут и нажмите развернуть. 

**Визуализация**

Сначала на экране появится слово, буквы которого записаны в синие кружки. Используйте компонент Circle.

![Строка в исходном виде](README_static/Untitled%201.png)

Строка в исходном виде

Два кандидата на сортировку подсвечены цветом `#D252E1`. Уже отсортированные элементы выделены `#7FE051`. 

На скриншоте показана строка, в которой поменяли местами крайние символы:

![Промежуточный этап разворота строки](README_static/Untitled%202.png)


## Последовательность Фибоначчи


![Начальное состояние страницы](README_static/Untitled%203.png)

Начальное состояние страницы

Например, вы ввели 4, тогда на экране должен появиться ряд 1, 1, 2, 3, 5. Максимальная граница ввода 1 ≤ `n`≤ 19.

**Визуализация**

Элементы отображаются постепенно. Сначала появляется один, потом второй, третий и так до `n`.

![Сгенерированная последовательность](README_static/Untitled%204.png)

---

## Сортировка массива


**Компоненты**

![Начальное состояние страницы](README_static/Untitled%205.png)

Начальное состояние страницы

Минимальное количество элементов массива 3, максимальное 17.

Максимальное значение элемента массива равно 100.

**Визуализация**

Когда вы нажмёте «По убыванию» или «По возрастанию», запускается процесс сортировки в зависимости от выбранного способа: выбором или пузырьком.

## Стек

![Начальное состояние страницы](README_static/Untitled%206.png)

Начальное состояние страницы

**Визуализация добавления** 

Если ввести в инпут значение и нажать «Добавить», в стеке появится первый элемент, который отрисуется на странице.

**Визуализация удаления**

Если нажать «Удалить», из стека извлекается только верхний элемент. Удаляемый элемент выделяется цветом, надпись `top` перемещается на его левого соседа. 

Если в стеке всего один элемент, то после нажатия «Удалить» на странице не отображаются никакие элементы стека. 

По клику на кнопку «Очистить» из стека удаляются все элементы сразу.

---

## Очередь

![Начальное состояние страницы](README_static/Untitled%207.png)

Начальное состояние страницы

**Визуализация**

Если ввести в инпут значение 2 и нажать «Добавить», элемент отобразится под индексом 0.

![Очередь с одним элементом](README_static/Untitled%208.png)

Очередь с одним элементом

При добавлении элементов в очередь позиция tail смещается`.

![Очередь из трёх элементов в момент добавления](README_static/Untitled%209.png)

Очередь из трёх элементов в момент добавления

![Очередь после `dequeue();`](README_static/Untitled%2010.png)


---

## Связный список

![Начальное состояние страницы](README_static/Untitled%2011.png)

Начальное состояние страницы

### Визуализация

**При добавлении в head** элемент появится над первым элементом вместо надписи head.

![Добавление в head](README_static/Untitled%2012.png)

Добавление в head

Затем он занимает первое место в списке и на долю секунды выделяется зелёным цветом. Теперь над новым элементом написано head, и он указывает на предыдущий head-элемент.

![Отображение нового элемента в head](README_static/Untitled%2013.png)


![Добавление по индексу. Поиск индекса](README_static/Untitled%2014.png)

Добавление по индексу. Поиск индекса

![Добавление по индексу. Новый элемент в списке](README_static/Untitled%2015.png)

Добавление по индексу. Новый элемент в списке

![Удаление элемента под индексом 2](README_static/Untitled%2016.png)

Удаление элемента под индексом 2

**При удалении элемента из tail** кружок замещает надпись tail.

![Удаление элемента из tail](README_static/Untitled%2017.png)

Удаление элемента из tail