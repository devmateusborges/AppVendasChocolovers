import { TypeStorageTemp } from "../@types/types";

export function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

export function compareDate(
  objeto1: TypeStorageTemp,
  objeto2: TypeStorageTemp
) {
  return (
    Number(new Date(objeto1.deliveryDate)) -
    Number(new Date(objeto2.deliveryDate))
  );
}

export function dateFormat(date1: string) {
  const date = new Date(date1); // Cria um objeto Date com a data e hora atuais
  const day = date.getDate().toString().padStart(2, "0"); // Obtém o dia do mês (1-31) e preenche com 0 à esquerda, se necessário
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Obtém o mês (0-11) e adiciona 1 para exibir no formato de 1-12 e preenche com 0 à esquerda, se necessário
  const year = date.getFullYear().toString();

  // Formata a data no formato dd/mm/aaaa
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}
