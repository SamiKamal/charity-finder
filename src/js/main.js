// show result based on search
// Infinte Loading DONE
// search based on what user chose  DONE
// link to org's page DONE
// search function DONE
// loading circle DONE
// fix some design problems DONE
// make the website responsive DONE
var convert = require('xml-js');
import * as searchView from './views/searchView'
import '../../dist/css/style.css'
var xml = require('!!raw-loader!./../xml/activeOrg.xml')

let searchType = 'name';
var result1 = convert.xml2js(xml.default, {compact: true});
let orgs = result1.organizations.organization

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // //  Funtions Call & Event Listeners // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// when user click on search options
document.querySelector('body').addEventListener('click', searchView.showSelection)
document.querySelector('.search__theme--ul').addEventListener('click', typeOfSearch)
document.querySelector('.search__input').addEventListener('keyup', searchLists)

window.addEventListener('load', searchView.showOrgs(orgs, 20))
window.addEventListener('scroll', (e) => {
   const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
   if (clientHeight + scrollTop >= scrollHeight - 139){
      console.log('YOU HIT THE BOTTOM')
      showloading()
      searchView.showOrgs(orgs, 20)
      }
})


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // //  Functions // // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
function searchLists(e) {
   if (searchType === 'name'){
      let filter = this.value.toUpperCase()
      Array.from(document.querySelector('.list').children).forEach(el => {
          let txtValue = el.children[1].children[0].textContent || el.children[1].children[0].innerHTML
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
              el.style.display = "";
            } else {
              el.style.display = "none";
            }
      })
   } else if (searchType === 'country-based'){
      let filter = this.value.toUpperCase()
      Array.from(document.querySelector('.list').children).forEach(el => {
          let txtValue = el.children[1].children[3].textContent || el.children[1].children[3].innerHTML
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
              el.style.display = "";
            } else {
              el.style.display = "none";
            }
      })
   } else if (searchType === 'country-helped'){
      let filter = this.value.toUpperCase()
      Array.from(document.querySelector('.list').children).forEach(el => {
         let txtValue = el.children[1].children[4].textContent || el.children[1].children[4].innerHTML
         if (txtValue.toUpperCase().indexOf(filter) > -1) {
            el.style.display = "";
         } else {
               el.style.display = "none";
         }
      })
      
   }
}

function typeOfSearch(e) {
   if (e.target.dataset){
      if (e.target.dataset.key === 'name'){
         searchType = 'name'
         document.querySelector('.search__theme--text').innerHTML = "Organization's Name"

      } else if (e.target.dataset.key === 'country-based'){
         searchType = 'country-based'
         document.querySelector('.search__theme--text').innerHTML = 'Organization Country'

      } else if (e.target.dataset.key === 'country-helped'){
         searchType = 'country-helped'
         document.querySelector('.search__theme--text').innerHTML = 'Countries The Organization Serves'
      }
   }
}

function showloading() {
   document.querySelector('.browser-screen-loading-content').classList.add('show')
}