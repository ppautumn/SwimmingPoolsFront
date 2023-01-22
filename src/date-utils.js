/**
 * @param {Date} date
 * @param {string} tzString
 * @returns {Date}
 */
const convertTZ = (date, tzString) => {
    return new Date(date.toLocaleString("en-US", {timeZone: tzString}))
}

export const formatDate = date => {
    const yektDate = convertTZ(date, 'Asia/Yekaterinburg')
    return `${yektDate.getFullYear()}-${(yektDate.getMonth() + 1).toString().padStart(2, '0')}-${yektDate.getDate().toString().padStart(2, '0')}`
}

/**
 *
 * @param {Date} date
 * @returns {Date}
 */
export const getDateOnly = (date) => {
    const dateOnly = new Date(date)
    dateOnly.setHours(0,0,0,0)
    return date
}

/**
 *
 * @param {Date} date
 * @returns {string}
 */
export const humanReadableDate = (date) => {
    return date.toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}