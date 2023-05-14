const { DataTypes, Model } = require('sequelize')
const bcryptjs = require('bcryptjs')

class User extends Model {
  static init (sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'O campo nome precisa ter entre 3 e 255 caracteres!'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'E-mail inválido!'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        defaultValue: ''
      },
      password_decrypted: {
        type: DataTypes.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 10],
            msg: 'O campo senha precisa ter entre 6 e 10 caracteres!'
          }
        }
      }
    }, { sequelize })

    this.addHook('beforeSave', async user => {
      if (user.password_decrypted) {
        user.password = await bcryptjs.hash(user.password_decrypted, 8)
      }
    })
  }

  passwordIsValid (passwordDecrypted) {
    return bcryptjs.compare(passwordDecrypted, this.password)
  }
}

module.exports = User
