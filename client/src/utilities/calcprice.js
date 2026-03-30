const SIZE_PRICES = {
    small: 10,
    medium: 15,
    large: 20,
}

const PAPER_PRICES = {
    blank: 0,
    lined: 2,
    dotted: 3,
    grid: 3,
}

const ACCESSORY_PRICES = {
    bookmark: 2,
    'pen holder': 4,
    'elastic band': 1,
    'zipper pocket': 5,
}

export const calcPrice = ({ size, paper, accessories = [] }) => {
    const sizePrice = SIZE_PRICES[size] ?? 0
    const paperPrice = PAPER_PRICES[paper] ?? 0
    const accessoriesPrice = accessories.reduce(
        (sum, a) => sum + (ACCESSORY_PRICES[a] ?? 0),
        0
    )
    return sizePrice + paperPrice + accessoriesPrice
}

export { SIZE_PRICES, PAPER_PRICES, ACCESSORY_PRICES }