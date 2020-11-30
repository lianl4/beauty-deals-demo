export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://beauty-deals.herokuapp.com/api';
const MAKEUP_API_BASE_URL = "https://makeup-api.herokuapp.com/api/v1/products.json";
export const MAKEUP_API_URL = ( brand, category ) => {
    if (brand === undefined && category !== undefined)
        return `${MAKEUP_API_BASE_URL}?product_type=${category}`;
    if (category === undefined && brand !== undefined)
        return `${MAKEUP_API_BASE_URL}?brand=${brand}`;
    else if (brand === undefined && category === undefined)
        return MAKEUP_API_BASE_URL;
    else
        return `${MAKEUP_API_BASE_URL}?brand=${brand}&product_type=${category}`;
}
export const MAKEUP_API_BY_ID_URL = ( id ) => {
    return `https://makeup-api.herokuapp.com/api/v1/products/${id}.json`;
}
export const ACCESS_TOKEN = 'accessToken';

export const POLL_LIST_SIZE = 30;
export const MAX_CHOICES = 6;
export const POLL_QUESTION_MAX_LENGTH = 140;
export const POLL_CHOICE_MAX_LENGTH = 40;

export const NAME_MIN_LENGTH = 4;
export const NAME_MAX_LENGTH = 40;

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 15;

export const EMAIL_MAX_LENGTH = 40;

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;

export const BRANDS = [
    "covergirl",
    "dior",
    "nyx",
    "revlon",
];

export const CATEGORIES = [
    "eyeliner",
    "eyeshadow",
    "foundation",
    "blush",
    "bronzer",
    "lip_liner",
    "lipstick",
    "mascara",
    "nail_polish",
];

export const theme = {
    "global": {
        "colors": {
            "background": {
                "light": "#ffffff",
                "dark": "#000000"
            }
        },
        "font": {
            "family": "-apple-system,\n         BlinkMacSystemFont, \n         \"Segoe UI\", \n         Roboto, \n         Oxygen, \n         Ubuntu, \n         Cantarell, \n         \"Fira Sans\", \n         \"Droid Sans\",  \n         \"Helvetica Neue\", \n         Arial, sans-serif,  \n         \"Apple Color Emoji\", \n         \"Segoe UI Emoji\", \n         \"Segoe UI Symbol\""
        }
    },
    "button": {
        "extend": [
            null
        ]
    }
};