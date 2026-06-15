# Frontend Development TODO

## Progress Summary

| Module | Total Endpoints | Connected | Remaining |
|----------|----------|----------|----------|
| Customer | 5 | 5 | 5 |
| Account | 4 | 4 | 4 |
| Staff | 4 | 4 | 4 |
| Currency | 4 | 0 | 4 |
| **Total** | **17** | **13** | **17** |

---

# Customer Module

## Customer List Page

- [x] Connect `GET /customer`
- [x] Display customer table
- [x] Add loading state
- [x] Add empty state
- [x] Add error handling

### API
```http
GET /customer
```

---

## Create Customer

- [x] Create customer form UI
- [x] Connect `POST /customer`
- [x] Form validation
- [x] Success notification
- [x] Error notification
- [x] Refresh customer list after creation

### API
```http
POST /customer
```

---

## Customer Details

- [x] Create customer details page
- [x] Connect `GET /customer/{id}`
- [x] Handle invalid customer id
- [x] Loading state

### API
```http
GET /customer/{id}
```

---

## Delete Customer

- [x] Add delete button
- [x] Confirmation modal
- [x] Connect `DELETE /customer/{id}`
- [x] Refresh customer list

### API
```http
DELETE /customer/{id}
```

---

## Customer Accounts

- [x] Create customer accounts section
- [x] Connect `GET /customer/account/{id}`
- [x] Display linked accounts
- [x] Empty state if no accounts

### API
```http
GET /customer/account/{id}
```

---

# Account Module

## Account List Page

- [x] Connect `GET /account`
- [x] Display account table
- [x] Loading state
- [x] Error handling

### API
```http
GET /account
```

---

## Create Account

- [x] Create account form UI
- [x] Connect `POST /account`
- [x] Validation
- [x] Success notification
- [x] Refresh account list

### API
```http
POST /account
```

---

## Account Details

- [x] Create account details page
- [x] Connect `GET /account/{id}`
- [x] Handle missing account

### API
```http
GET /account/{id}
```

---

## Delete Account

- [x] Add delete action
- [x] Confirmation modal
- [x] Connect `DELETE /account/{id}`
- [x] Refresh list

### API
```http
DELETE /account/{id}
```

---

# Staff Module

## Staff List Page

- [x] Connect `GET /staff`
- [x] Display staff table
- [x] Loading state
- [x] Error handling

### API
```http
GET /staff
```

---

## Create Staff

- [x] Create staff form
- [x] Connect `POST /staff`
- [x] Validation
- [x] Success notification

### API
```http
POST /staff
```

---

## Staff Details

- [x] Connect `GET /staff/{id}`
- [x] Create details page
- [x] Handle invalid id

### API
```http
GET /staff/{id}
```

---

## Delete Staff

- [x] Add delete action
- [x] Confirmation modal
- [x] Connect `DELETE /staff/{id}`

### API
```http
DELETE /staff/{id}
```

---

# Currency Module

## Currency List Page

- [ ] Connect `GET /currency`
- [ ] Display currency table
- [ ] Loading state
- [ ] Error handling

### API
```http
GET /currency
```

---

## Create Currency

- [ ] Create currency form
- [ ] Connect `POST /currency`
- [ ] Validation
- [ ] Success notification

### API
```http
POST /currency
```

---

## Currency Details

- [ ] Connect `GET /currency/{id}`
- [ ] Create details page
- [ ] Handle invalid id

### API
```http
GET /currency/{id}
```

---

## Delete Currency

- [ ] Add delete action
- [ ] Confirmation modal
- [ ] Connect `DELETE /currency/{id}`

### API
```http
DELETE /currency/{id}
```

---
