export function addCart(product_id, products){
    let productCount = Number(prompt("Сколько вы хотите положить этого товара в корзину?"))
    if (Number.isInteger(productCount) && productCount > 0){
        if (products.find(i => i.id === product_id).quantity >= productCount){
            if (localStorage.getItem('cart')) {
                let cartItems = JSON.parse(localStorage.getItem('cart'))
                if (cartItems.length > 0) {
                    cartItems.push({id: cartItems[cartItems.length - 1].id + 1, product_id, quantity: productCount})
                    localStorage.setItem('cart', JSON.stringify(cartItems))
                } else {
                    localStorage.setItem('cart', JSON.stringify([{id: 1, product_id, quantity: productCount}]))
                }
            }   else {
                localStorage.setItem('cart', JSON.stringify([{id: 1, product_id, quantity: productCount}]))
            }
        } else {
            alert('На складе нет столько товара попробуйте заказть меньше')
        }
    } else {
        alert('Введите целочисленное число!!!')
    }
}