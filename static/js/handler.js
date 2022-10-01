var account_id = 0
var balance = 0
var new_balance = 0

function check() {
	$.getJSON("http://127.0.0.1:5000/static/json/data.json", function(data) {
		$.each(data, function(key, value) {
			for(let i = 0; i < Object.keys(value).length; i++) {
				if(document.getElementById('name').value == value[i].name) {
					account_id = value[i].id
					balance = value[i].balance
					document.getElementById('response').innerHTML = "account id = " + account_id + "<br>" + "balance = " + balance
					break
				} else {
					document.getElementById('response').innerHTML = "No Account Found"
					break
				}
			}
			if(account_id > 0 && balance > 0) {
				document.getElementById("pay").disabled = false;
			}
		})
	})
}

function pay() {
	$.getJSON("http://127.0.0.1:5000/static/json/data.json", function(data) {
		if(document.getElementById('price').value > parseInt(balance)) {
			$.each(data, function(key, value) {
				for(let i = 0; i < Object.keys(value).length; i++) {
					if(document.getElementById('name').value == value[i].name) {
						document.getElementById('response').innerHTML = "Not Enough Balance !" + "<br>" + "account id = " + value[i].id + "<br>" + "balance = " + value[i].balance;
						document.getElementById('price').value = null;
						document.getElementById('pay').disabled = true;
					}
				}
			})
		} else {
			new_balance = parseInt(balance) - document.getElementById('price').value
			send_data_to_python(data, account_id, new_balance)
		}
	})
}

function send_data_to_python(data) {
	fetch(`/editdata/${data}/${account_id}/${new_balance}`).then(function(response) {
		return response.text()
	}).then(function(result) {
		result = JSON.parse(result)
		$.each(result, function(key, value) {
			for(let i = 0; i < Object.keys(value).length; i++) {
				if(document.getElementById('name').value == value[i].name) {
					document.getElementById('response').innerHTML = "Transaction Completed Successfully !" + "<br>" + "account id = " + value[i].id + "<br>" + "balance = " + value[i].balance;
					document.getElementById('price').value = null;
					document.getElementById('pay').disabled = true;
				}
			}
		})
	});
}