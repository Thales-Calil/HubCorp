var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/models/User.js
var require_User = __commonJS({
  "src/models/User.js"(exports2, module2) {
    var { DataTypes } = require("sequelize");
    var sequelize = require("../database/connection");
    var User2 = sequelize.define("User", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false
      },
      telefone: {
        type: DataTypes.STRING,
        allowNull: true
      },
      cargo: {
        type: DataTypes.STRING,
        allowNull: true
      },
      setorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "setor_id"
      },
      userType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ativo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    }, {
      tableName: "usuario",
      timestamps: false
    });
    module2.exports = User2;
  }
});

// src/models/Answer.js
var require_Answer = __commonJS({
  "src/models/Answer.js"(exports2, module2) {
    var { DataTypes } = require("sequelize");
    var sequelize = require("../database/connection");
    var Answer2 = sequelize.define("Answer", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      formularioRespondidoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "formulario_respondido_id"
      },
      perguntaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "pergunta_id"
      },
      valor: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      tableName: "resposta",
      timestamps: false
    });
    module2.exports = Answer2;
  }
});

// src/models/AnsweredForm.js
var require_AnsweredForm = __commonJS({
  "src/models/AnsweredForm.js"(exports2, module2) {
    var { DataTypes } = require("sequelize");
    var sequelize = require("../database/connection");
    var AnsweredForm2 = sequelize.define("AnsweredForm", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      formularioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "formulario_id"
      },
      usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "usuario_id"
      },
      dataResposta: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "data_resposta"
      }
    }, {
      tableName: "formulario_respondido",
      timestamps: false
    });
    module2.exports = AnsweredForm2;
  }
});

// src/models/Sector.js
var require_Sector = __commonJS({
  "src/models/Sector.js"(exports2, module2) {
    var { DataTypes } = require("sequelize");
    var sequelize = require("../database/connection");
    var Sector2 = sequelize.define("Sector", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    }, {
      tableName: "setor",
      timestamps: false
    });
    module2.exports = Sector2;
  }
});

// src/models/Notification.js
var require_Notification = __commonJS({
  "src/models/Notification.js"(exports2, module2) {
    var { DataTypes } = require("sequelize");
    var sequelize = require("../database/connection");
    var Notification2 = sequelize.define("Notification", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      autorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "usuario_id"
      },
      dataCriacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "data_criacao"
      }
    }, {
      tableName: "notificacao",
      timestamps: false
    });
    module2.exports = Notification2;
  }
});

// src/models/NotificationSector.js
var require_NotificationSector = __commonJS({
  "src/models/NotificationSector.js"(exports2, module2) {
    var { DataTypes } = require("sequelize");
    var sequelize = require("../database/connection");
    var NotificationSector2 = sequelize.define("NotificationSector", {
      notificacaoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "notificacao_id"
      },
      setorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "setor_id"
      }
    }, {
      tableName: "notificacao_setor",
      timestamps: false
    });
    module2.exports = NotificationSector2;
  }
});

// src/models/Question.js
var require_Question = __commonJS({
  "src/models/Question.js"(exports2, module2) {
    var { DataTypes } = require("sequelize");
    var sequelize = require("../database/connection");
    var Question2 = sequelize.define("Question", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      formularioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "formulario_id"
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      tipo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ordem: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      opcoes: {
        type: DataTypes.JSON,
        allowNull: true
      }
    }, {
      tableName: "pergunta",
      timestamps: false
    });
    module2.exports = Question2;
  }
});

// src/models/Form.js
var require_Form = __commonJS({
  "src/models/Form.js"(exports2, module2) {
    var { DataTypes } = require("sequelize");
    var sequelize = require("../database/connection");
    var Form2 = sequelize.define("Form", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dataCriacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "data_criacao"
      },
      ativo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    }, {
      tableName: "formulario",
      timestamps: false
    });
    module2.exports = Form2;
  }
});

// src/models/associations.js
var require_associations = __commonJS({
  "src/models/associations.js"(exports2, module2) {
    var User2 = require_User();
    var Sector2 = require_Sector();
    var Notification2 = require_Notification();
    var NotificationSector2 = require_NotificationSector();
    var Question2 = require_Question();
    var Form2 = require_Form();
    var AnsweredForm2 = require_AnsweredForm();
    var Answer2 = require_Answer();
    User2.belongsTo(Sector2, {
      foreignKey: "setorId"
    });
    Sector2.hasMany(User2, {
      foreignKey: "setorId"
    });
    Notification2.belongsTo(User2, {
      foreignKey: "autorId",
      as: "autor"
    });
    User2.hasMany(Notification2, {
      foreignKey: "autorId"
    });
    Notification2.belongsToMany(Sector2, {
      through: NotificationSector2,
      foreignKey: "notificacaoId",
      otherKey: "setorId"
    });
    Sector2.belongsToMany(Notification2, {
      through: NotificationSector2,
      foreignKey: "setorId",
      otherKey: "notificacaoId"
    });
    Form2.hasMany(Question2, {
      foreignKey: "formularioId"
    });
    Question2.belongsTo(Form2, {
      foreignKey: "formularioId"
    });
    Form2.hasMany(AnsweredForm2, {
      foreignKey: "formularioId"
    });
    AnsweredForm2.belongsTo(Form2, {
      foreignKey: "formularioId"
    });
    User2.hasMany(AnsweredForm2, {
      foreignKey: "usuarioId"
    });
    AnsweredForm2.belongsTo(User2, {
      foreignKey: "usuarioId"
    });
    AnsweredForm2.hasMany(Answer2, {
      foreignKey: "formularioRespondidoId"
    });
    Answer2.belongsTo(AnsweredForm2, {
      foreignKey: "formularioRespondidoId"
    });
    Question2.hasMany(Answer2, {
      foreignKey: "perguntaId"
    });
    Answer2.belongsTo(Question2, {
      foreignKey: "perguntaId"
    });
    module2.exports = {
      User: User2,
      Sector: Sector2,
      Notification: Notification2,
      NotificationSector: NotificationSector2,
      Form: Form2,
      Question: Question2,
      AnsweredForm: AnsweredForm2,
      Answer: Answer2
    };
  }
});

// src/models/index.js
var index_exports = {};
__export(index_exports, {
  Answer: () => import_Answer.Answer,
  AnsweredForm: () => import_AnsweredForm.AnsweredForm,
  Form: () => import_Form.Form,
  Notification: () => import_Notification.Notification,
  NotificationSector: () => import_NotificationSector.NotificationSector,
  Question: () => import_Question.Question,
  Sector: () => import_Sector.Sector,
  User: () => import_User.User,
  associations: () => import_associations.associations
});
module.exports = __toCommonJS(index_exports);
var import_User = __toESM(require_User());
var import_Answer = __toESM(require_Answer());
var import_AnsweredForm = __toESM(require_AnsweredForm());
var import_associations = __toESM(require_associations());
var import_Form = __toESM(require_Form());
var import_Notification = __toESM(require_Notification());
var import_NotificationSector = __toESM(require_NotificationSector());
var import_Question = __toESM(require_Question());
var import_Sector = __toESM(require_Sector());
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Answer,
  AnsweredForm,
  Form,
  Notification,
  NotificationSector,
  Question,
  Sector,
  User,
  associations
});
