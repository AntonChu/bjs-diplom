'use strict';

let logout = new LogoutButton();
logout.action = () => ApiConnector.logout(response => {
    if(response.success){
        location.reload();
    }
});



ApiConnector.current(response => {
    if(response.success){
        ProfileWidget.showProfile(response.data);
    }
});



let rate = new RatesBoard();

function getRates(){
    ApiConnector.getStocks(response => {
        if(response.success){
            rate.clearTable();
            rate.fillTable(response.data);
        }
    })
}

getRates();
setInterval(getRates, 60000);



let money = new MoneyManager();
money.addMoneyCallback = (data) => ApiConnector.addMoney(data, response => {
    if(response.success){
        ProfileWidget.showProfile(response.data);
        money.setMessage(response.success, 'Пополнение успешно проведено');
    }else{
        money.setMessage(response.success, response.error);
    }
});

money.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, response => {
    if(response.success){
        ProfileWidget.showProfile(response.data);
        money.setMessage(response.success, 'Конвертация успешно проведена');
    }else{
        money.setMessage(response.success, response.error);
    }
});

money.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, response => {
    if(response.success){
        ProfileWidget.showProfile(response.data);
        money.setMessage(response.success, 'Перевод успешно проведен');
    }else{
        money.setMessage(response.success, response.error);
    }
});



let favorite = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    if(response.success){
        favorite.clearTable();
        favorite.fillTable(response.data);
        money.updateUsersList(response.data);
    }
});

favorite.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, response => {
    if(response.success){
        favorite.clearTable();
        favorite.fillTable(response.data);
        money.updateUsersList(response.data);
        favorite.setMessage(response.success, 'Пользователь успешно добавлен');
    }else{
        favorite.setMessage(response.success, response.error);
    }
});

favorite.removeUserCallback = (id) => ApiConnector.removeUserFromFavorites(id, response => {
    if(response.success){
        favorite.clearTable();
        favorite.fillTable(response.data);
        money.updateUsersList(response.data);
        favorite.setMessage(response.success, 'Пользователь успешно удален');
    }else{
        favorite.setMessage(response.success, response.error);
    }
})
