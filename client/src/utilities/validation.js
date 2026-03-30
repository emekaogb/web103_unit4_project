export const getValidationError = ({ size, paper }) => {
    if (size === 'large' && paper === 'dotted') {
        return 'Large journals cannot have dotted paper.'
    }
    if (size === 'small' && paper === 'grid') {
        return 'Small journals cannot have grid paper.'
    }
    return null
}