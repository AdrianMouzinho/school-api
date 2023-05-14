const { DataTypes, Model } = require('sequelize')

class Student extends Model {
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
      surname: {
        type: DataTypes.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'O campo sobrenome precisa ter entre 3 e 255 caracteres!'
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
      age: {
        type: DataTypes.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'O tipo do campo idade deve ser inteiro'
          }
        }
      },
      weight: {
        type: DataTypes.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'O tipo do campo peso deve ser inteiro'
          }
        }
      },
      height: {
        type: DataTypes.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'O tipo do campo altura deve ser inteiro'
          }
        }
      }
    }, { sequelize })
  }

  static associate (models) {
    this.hasMany(models.Image, { foreignKey: 'student_id' })
  }
}

module.exports = Student
