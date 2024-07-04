import { ref } from 'vue';
import { MenuParser } from '../utils/MenuParser';
// Find icons here: https://oh-vue-icons.js.org/
export default function useMenu() {
  const manuParser = new MenuParser();

  const menu = ref([...manuParser.parseAndBuild()]);

  function editMenuItem(key, { title, link, icon }) {
    const itemIndex = menu.value.findIndex((item) => item.key === key);
    if (itemIndex >= 0) {
      menu.value[itemIndex] = {
        title: title ? title : menu.value.at(itemIndex).title,
        link: link ? link : menu.value.at(itemIndex).link,
        icon: icon ? icon : menu.value.at(itemIndex).icon,
      };
    }
  }

  return {
    menu,
    editMenuItem,
  };
}
