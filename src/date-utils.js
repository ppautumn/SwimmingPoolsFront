/**
 * @param {Date} date
 * @param {string} tzString
 * @returns {Date}
 */
const convertTZ = (date, tzString) =>
    new Date(date.toLocaleString("en-US", {timeZone: tzString}))

export const formatDate = date => {
    const yektDate = convertTZ(date, 'Asia/Yekaterinburg')
    return `${yektDate.getFullYear()}-${(yektDate.getMonth() + 1).toString().padStart(2, '0')}-${yektDate.getDate().toString().padStart(2, '0')}`
}

/**
 *
 * @param {Date} date
 * @returns {Date}
 */
export const getDateOnly = date => {
    const dateOnly = new Date(date)
    dateOnly.setHours(0,0,0,0)
    return date
}

/**
 *
 * @param {Date} date
 * @returns {string}
 */
export const humanReadableDate = date =>
    date.toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

/**
 *
 * @param {Date} date
 * @returns {{month: string, day: string, weekday: string}}
 */
export const threeBlocksDate = date => {
    const localeString = date.toLocaleString('ru', {
        month: 'long',
        day: 'numeric',
        weekday: 'short'
    })
    const localeSplit = localeString.split(' ')
    localeSplit[0] = localeSplit[0][0] + localeSplit[0][1]
    return {
        month: localeSplit[2],
        day: localeSplit[1],
        weekday: localeSplit[0],
    }
}