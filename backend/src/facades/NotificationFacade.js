const Notification = require("../models/Notification");
const Sector = require("../models/Sector");

class NotificationFacade {

    static async criarNotificacao(dadosNotificacao, setores = []) {

        const notificacao = await Notification.create(dadosNotificacao);

        if (setores.length > 0) {
            await notificacao.setSectors(setores);
        }

        return Notification.findByPk(notificacao.id, {
            include: {
                model: Sector
            }
        });
    }
}

module.exports = NotificationFacade;