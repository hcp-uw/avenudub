export const places = []

export const incidents = []

export function places(){
    fetch('/business_screens/businesshome/')
    .then(response => response.json())
    .then(data => {
//# {name, place_id, types, phone, address, rating, google_maps_link, latitude, longitude, review_summary, opening_hours} 
        if(data.success == True){
           data.forEach(item => {
            places.append(item);
           })
        }
    })
}

export function Safety(){
    fetch(`/reports_screens/safetyhome/${30}`)
    .then(response => response.json())
    .then(data => {
// returns: {'success' : bool, 'resp' : list of dicts} - each element contains: {created_at, case_num, crime_type, address, case_open, case_close}
        if(data.success == True){
          data.forEach(item => {
            incidents.append(item)
          })
        }
    })
}