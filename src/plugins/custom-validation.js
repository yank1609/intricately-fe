import numeral from 'numeral'

const minValue = {
  validate (value, args) {
    return new Promise( resolve => {
      if ([null, undefined, ''].includes(value)) {
        resolve({
          valid: false
        })
      } else {
        resolve({
          valid: numeral(value).value() >= args[0]
        })
      }
    })
  },
  getMessage (field, args) {
    return `The ${field} field is required and must be ${args[0] || 0} or more`
  }
}

const maxValue = {
  validate (value, args) {
    return new Promise(resolve => {
      if ([null, undefined, ''].includes(value)) {
        resolve({
          valid: false
        })
      } else {
        resolve({
          valid: numeral(value).value() <= args[0]
        })
      }
    })
  },
  getMessage (field, args) {
    return `The ${field} field is required and must be ${args[0] || 0} or less`
  }
}

export {
  minValue,
  maxValue
}