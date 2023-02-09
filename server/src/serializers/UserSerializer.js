class UserSerializer {
  static getSummary(user) {
    const allowedAttributes = ['username']

    let serializedUser = {}
    for (const attribute of allowedAttributes) {
      serializedUser[attribute] = user[attribute]
    }

    return serializedUser
  }
}

export default UserSerializer