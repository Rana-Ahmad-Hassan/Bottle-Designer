import { BottleType } from "../types/bottles";
import { CapsuleType } from "../types/bottles";


export const bottleOptions: { type: BottleType; name: string; image: string }[] = [
    {
        type: 'bordeaux',
        name: 'Bordeaux Bottle',
        image: 'https://s3-alpha-sig.figma.com/img/02fa/8044/9048f98ccd7366b7ce6a6bc3281d9527?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pB5RTXFrKiZuWJ4CKnZBxBOWJ7PGP5tG~COch8dlxablkVJmVgMawsKT7VC~QCuvxjElyo511SXJzagNOxUmKFti8j4VI-JqMc-UoIBAVel1bjnJrByWNhECUuGXmcouLMcwfpDbSquPIrDtJahqhxd5rweigKz5dcTJm30TL~sSXxseldCx--uecCXO6PssOV8DMHg4X7SuFfqJDU9Jqmul9MKaEqjErVN1AMJidbVjEdoQbSKFWqTQfIOeo8TQ6mKa6gwhiDGaLRuKaz2JVBmZ8uMGXMl4XSOpaBYMFJL67oQTS0IveNQcEw-h0RYSW3Mdc~1Ifs~DVpklMJAVkg__'
    },
    {
        type: 'burgundy',
        name: 'Burgundy Bottle',
        image:
            'https://media.istockphoto.com/id/481981792/photo/empty-beer-bottle.jpg?s=612x612&w=0&k=20&c=tJykifFBqh6V9xexlwLgeuGnxjlQ0dAw6jjzHmbQG5Y=',
    },
    {
        type: 'alsace',
        name: 'Alsace Bottle',
        image:
            'https://media.istockphoto.com/id/481981792/photo/empty-beer-bottle.jpg?s=612x612&w=0&k=20&c=tJykifFBqh6V9xexlwLgeuGnxjlQ0dAw6jjzHmbQG5Y=',
    },
    {
        type: 'champagne',
        name: 'Champagne Bottle',
        image:
            'https://media.istockphoto.com/id/481981792/photo/empty-beer-bottle.jpg?s=612x612&w=0&k=20&c=tJykifFBqh6V9xexlwLgeuGnxjlQ0dAw6jjzHmbQG5Y=',
    },
    {
        type: 'port',
        name: 'Port Bottle',
        image:
            'https://media.istockphoto.com/id/481981792/photo/empty-beer-bottle.jpg?s=612x612&w=0&k=20&c=tJykifFBqh6V9xexlwLgeuGnxjlQ0dAw6jjzHmbQG5Y=',
    },
];

export const bottleVariants = {
    white: Array.from({ length: 24 }, (_, i) => ({
        id: `white-${i + 1}`,
        name: `White ${i + 1}`,
        value: `hsl(60, 100%, ${90 - i * 2}%)`,
    })),
    rose: Array.from({ length: 24 }, (_, i) => ({
        id: `rose-${i + 1}`,
        name: `Rosé ${i + 1}`,
        value: `hsl(0, 70%, ${90 - i * 2}%)`,
    })),
    red: Array.from({ length: 24 }, (_, i) => ({
        id: `red-${i + 1}`,
        name: `Red ${i + 1}`,
        value: `hsl(350, 60%, ${80 - i * 2}%)`,
    })),
};


export const capsuleOptions: { type: CapsuleType; name: string; image: string }[] = [
    {
        type: 'cork',
        name: 'Cork Capsule',
        image:
            'https://media.istockphoto.com/id/481981792/photo/empty-beer-bottle.jpg?s=612x612&w=0&k=20&c=tJykifFBqh6V9xexlwLgeuGnxjlQ0dAw6jjzHmbQG5Y=',
    },
    {
        type: 'screw',
        name: 'Screw Cap',
        image:
            'https://media.istockphoto.com/id/481981792/photo/empty-beer-bottle.jpg?s=612x612&w=0&k=20&c=tJykifFBqh6V9xexlwLgeuGnxjlQ0dAw6jjzHmbQG5Y=',
    },
    {
        type: 'synthetic',
        name: 'Synthetic Cork',
        image:
            'https://media.istockphoto.com/id/481981792/photo/empty-beer-bottle.jpg?s=612x612&w=0&k=20&c=tJykifFBqh6V9xexlwLgeuGnxjlQ0dAw6jjzHmbQG5Y=',
    },
    {
        type: 'crown',
        name: 'Crown Cap',
        image:
            'https://media.istockphoto.com/id/481981792/photo/empty-beer-bottle.jpg?s=612x612&w=0&k=20&c=tJykifFBqh6V9xexlwLgeuGnxjlQ0dAw6jjzHmbQG5Y=',
    },
];

export const bottleColors = [
    { id: 'white', name: 'White Wine', value: '#ffffff' },
    { id: 'rose', name: 'Rosé Wine', value: '#ffcccb' },
    { id: 'red', name: 'Red Wine', value: '#722f37' },
    { id: 'amber', name: 'Amber Wine', value: '#ffbf00' },
    { id: 'purple', name: 'Purple', value: '#800080' },
    { id: 'blue', name: 'Blue', value: '#0000ff' },
    { id: 'green', name: 'Green', value: '#008000' },
    { id: 'pink', name: 'Pink', value: '#ffc0cb' },
    { id: 'brown', name: 'Brown', value: '#964b00' },
    { id: 'yellow', name: 'Yellow', value: '#ffff00' },
    { id: 'orange', name: 'Orange', value: '#ffa500' },
    { id: 'gold', name: 'Gold', value: '#d4af37' },
    { id: 'silver', name: 'Silver', value: '#c0c0c0' },
    { id: 'gray', name: 'Gray', value: '#808080' },
    { id: 'pink-red', name: 'Pink-Red', value: '#ff007f' },
    { id: 'pink-purple', name: 'Pink-Purple', value: '#800080' },
    { id: 'purple-blue', name: 'Purple-Blue', value: '#0000ff' },
    { id: 'blue-green', name: 'Blue-Green', value: '#008000' },
    { id: 'green-yellow', name: 'Green-Yellow', value: '#ffff00' },
    { id: 'yellow-orange', name: 'Yellow-Orange', value: '#ffa500' },
];

export const capsuleVariants = [
    { id: 'white', name: 'White', colors: Array.from({ length: 10 }, (_, i) => `hsl(60, 100%, ${90 - i * 2}%)`) },
    { id: 'rose', name: 'Rosé', colors: Array.from({ length: 10 }, (_, i) => `hsl(0, 70%, ${90 - i * 2}%)`) },
    { id: 'red', name: 'Red', colors: Array.from({ length: 4 }, (_, i) => `hsl(350, 60%, ${80 - i * 2}%)`) },
];

export const textureTypes = [
    { id: 'none', name: 'No Texture', value: 'none' },
    { id: 'matte', name: 'Matte', value: 'matte' },
    { id: 'glossy', name: 'Glossy', value: 'glossy' },
    { id: 'frosted', name: 'Frosted', value: 'frosted' },
    { id: 'leather', name: 'Leather', value: 'leather' },
];

export const backgroundTypes = [
    { id: 'none', name: 'No Background', value: 'transparent' },
    { id: 'white', name: 'White', value: '#ffffff' },
    { id: 'black', name: 'Black', value: '#000000' },
    { id: 'gradient', name: 'Gradient', value: 'linear-gradient(45deg, #f3f4f6, #e5e7eb)' },
];
