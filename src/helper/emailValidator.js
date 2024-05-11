export function emailValidator(email) {
    const re = /\S+@\S+\.\S+/
    if (!email) return "E-posta boş bırakılamaz"
    if (!re.test(email)) return "Geçersiz e-posta"
    return ''
  }
  