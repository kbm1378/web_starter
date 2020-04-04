$(document).ready(function () {
    $('#orders-box').html('');
    listing();
});


function submitOrder() {
    let name = $('#input-name').val();
    let count = $('#input-count').val();
    let address = $('#input-address').val();
    let phone = $('#input-phone').val();

    if (name === '') {
        alert('주문자 이름을 입력해주세요.')
        $('#input-name').focus()
    } else if (count === '') {
        alert('수량을 입력해주세요.')
        $('#input-count').focus()
    } else if (address === '') {
        alert('주소를 입력해주세요.')
        $('#input-address').focus()
    } else if (phone === '') {
        alert('전화번호를 입력해주세요.')
        $('#input-phone').focus()
    } else if (!isValidPhoneNum(phone)) {
        alert('휴대폰번호 입력 형식이 틀립니다.\n010-0000-0000으로 입력해주세요.')
    } else {
        $.ajax({
            type: "POST",
            url: "/order",
            data: { name_give: name, count_give: count, address_give: address, phone_give: phone},
            success: function(response) {
                alert(response.msg)
                $('#input-name').val('');
                $('#input-count').val('');
                $('#input-address').val('');
                $('#input-phone').val('');
                window.location.reload();
            }
        });
    }
}

function isValidOrder() {
    let name = $('#input-name').val();
    let count = $('#input-count').val();
    let address = $('#input-address').val();
    let phone = $('#input-phone').val();

    if (name === '') {
        alert('주문자 이름을 입력해주세요.')
        $('#input-name').focus()
        return false;
    } else if (count === '') {
        alert('수량을 입력해주세요.')
        $('#input-count').focus()
        return false;
    } else if (address === '') {
        alert('주소를 입력해주세요.')
        $('#input-address').focus()
        return false;
    } else if (phone === '') {
        alert('전화번호를 입력해주세요.')
        $('#input-phone').focus()
        return false;
    } else if (!isValidPhoneNum(phone)) {
        alert('휴대폰번호 입력 형식이 틀립니다.\n010-0000-0000으로 입력해주세요.')
        return false;
    }
    return true;
}

function isValidPhoneNum(phone) {
    let splitByHyphen = phone.split('-')
    if (splitByHyphen.length != 3) {
        return false;
    } else if (splitByHyphen[0] !== '010') {
        return false;
    } else if (isNaN(splitByHyphen[1]) || isNaN(splitByHyphen[2])) {
        return false;
    } else if (splitByHyphen[1].length !== 4 || splitByHyphen[2].length !== 4) {
        return false;
    }
    return true;
}

function listing() {
    $.ajax({
        type: "GET",
        url: "/order",
        data: {},
        success: function (response) {
            if (response['result'] == 'success') {
                let orders = response['orders'];
                for (let i = 0; i < orders.length; i++) {
                    make_order(orders[i]['name'], orders[i]['count'], orders[i]['address'], orders[i]['phone']);
                }
            } else {
                alert('구매목록 받아오지 못했습니다');
            }
        }
    })
}

function make_order(name, count, address, phone) {
    let temp_html = '<tr>\
      <th scope="row">' + name + '</th>\
      <td>' + count + '</td>\
      <td>' + address + '</td>\
      <td>' + phone + '</td>\
    </tr>'

    $("#orders-box").append(temp_html);
}