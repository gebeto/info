## Order
 - order.id
 - order.boxes
 - order.commodity
 - order.company
  - order.company.full_name
  - order.company.short_name
  - order.company.phone
  - order.company.email
  - order.company.price_category
  - order.company.accountancy_number
 - order.cooler_type
 - order.created_at
 - order.created_by
  - order.created_by.email
  - order.created_by.first_name
  - order.created_by.last_name
  - order.created_by.phone
  - order.created_by.company
   - order.created_by.company.email
   - order.created_by.company.phone
   - order.created_by.company.full_name
   - order.created_by.company.short_name
 - order.eta_3rd_party
  - order.eta_3rd_party.email
  - order.eta_3rd_party.phone
  - order.eta_3rd_party.full_name
  - order.eta_3rd_party.short_name
 - order.eta_date
 - order.eta_driver
  - order.eta_driver.email
  - order.eta_driver.first_name
  - order.eta_driver.last_name
  - order.eta_driver.phone
  - order.eta_driver.trailer_number
  - order.eta_driver.truck_number
  - order.eta_driver.company
   - order.eta_driver.company.email
   - order.eta_driver.company.phone
   - order.eta_driver.company.full_name
   - order.eta_driver.company.short_name
 - order.eta_time
 - order.eta_trailer
 - order.eta_truck
 - order.etd_3rd_party
  - order.etd_3rd_party.email
  - order.etd_3rd_party.phone
  - order.etd_3rd_party.full_name
  - order.etd_3rd_party.short_name
 - order.etd_date
 - order.etd_driver
  - order.etd_driver.email
  - order.etd_driver.first_name
  - order.etd_driver.last_name
  - order.etd_driver.phone
  - order.etd_driver.trailer_number
  - order.etd_driver.truck_number
  - order.etd_driver.company
   - order.etd_driver.company.email
   - order.etd_driver.company.phone
   - order.etd_driver.company.full_name
   - order.etd_driver.company.short_name
 - order.etd_time
 - order.etd_trailer
 - order.etd_truck
 - order.kilos
 - order.load_no
 - order.loading_order
 - order.notes
 - order.pallets
 - order.plumb_seal
 - order.port_in
 - order.port_out
 - order.printed_doc
 - order.priority
 - order.reference
 - order.service
 - order.slot_time
 - order.split_load
 - order.status
 - order.trip_number
 - order.updated_by
  - order.updated_by.email
  - order.updated_by.first_name
  - order.updated_by.last_name
  - order.updated_by.phone
  - order.updated_by.company
   - order.updated_by.full_name
   - order.updated_by.short_name
   - order.updated_by.phone
   - order.updated_by.email
 - order.updated_at



## Driver
 - .id
 - .email
 - .first_name
 - .last_name
 - .phone
 - .trailer_number
 - .truck_number
 - .company

#### Example
 - order.eta_driver.first_name
 - order.etd_driver.phone

#### Drivers fields:
 - order.eta_driver
 - order.etd_driver



## User

 - .id
 - .email
 - .first_name
 - .last_name
 - .phone
 - .company

#### Example
 - order.creted_by.first_name
 - order.updated_by.phone

#### Drivers fields:
 - order.created_by
 - order.updated_by



## Base Company
 - .full_name
 - .short_name
 - .phone
 - .email

#### Example
 - order.updated_by.company.full_name
 - order.created_by.company.full_name

#### Companies fields:
 - order.created_by.company
 - order.updated_by.company



## Customer Company
 - .id
 - .full_name
 - .short_name
 - .phone
 - .email
 - .price_category
 - .accountancy_number

#### Example
 - order.company.full_name
 - order.company.accountancy_number

#### Companies fields:
 - order.company
