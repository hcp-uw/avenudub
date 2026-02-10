export const businesses = []

export const incidents = []

import { FULL_URL } from "../config"

export function places(){
  return fetch(`${FULL_URL}/business_screens/businesshome/`)
  .then(response => response.json())
  .then(data => {
    // data may be { success: true, resp: [...] } or an array
    let items = data
    if (data && data.success === true && Array.isArray(data.resp)) {
      items = data.resp
    }
    if (Array.isArray(items)){
       items.forEach(item => {
      businesses.push(item);
       })
    }
    return businesses
  })
}

export function crimes(){
    return fetch(`${FULL_URL}/reports_screens/safetyhome/${30}`)
    .then(response => response.json())
    .then(data => {
        // returns: { success: bool, resp: [...] }
        let items = data
        if (data && data.success === true && Array.isArray(data.resp)) {
            items = data.resp
        }
        if (Array.isArray(items)){
          items.forEach(item => {
            incidents.push(item)
          })
        }
        return incidents
    })
}