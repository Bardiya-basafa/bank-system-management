# Frontend Development TODO

## Progress Summary

| Module | Total Endpoints | Connected | Remaining |
|----------|----------|----------|----------|
| Customer | 5 | 0 | 5 |
| Account | 4 | 0 | 4 |
| Staff | 4 | 0 | 4 |
| Currency | 4 | 0 | 4 |
| **Total** | **17** | **0** | **17** |

---

# Customer Module

## Customer List Page

- [ ] Connect `GET /customer`
- [ ] Display customer table
- [ ] Add loading state
- [ ] Add empty state
- [ ] Add error handling

### API
```http
GET /customer
```

---

## Create Customer

- [ ] Create customer form UI
- [ ] Connect `POST /customer`
- [ ] Form validation
- [ ] Success notification
- [ ] Error notification
- [ ] Refresh customer list after creation

### API
```http
POST /customer
```

---

## Customer Details

- [ ] Create customer details page
- [ ] Connect `GET /customer/{id}`
- [ ] Handle invalid customer id
- [ ] Loading state

### API
```http
GET /customer/{id}
```

---

## Delete Customer

- [ ] Add delete button
- [ ] Confirmation modal
- [ ] Connect `DELETE /customer/{id}`
- [ ] Refresh customer list

### API
```http
DELETE /customer/{id}
```

---

## Customer Accounts

- [ ] Create customer accounts section
- [ ] Connect `GET /customer/account/{id}`
- [ ] Display linked accounts
- [ ] Empty state if no accounts

### API
```http
GET /customer/account/{id}
```

---

# Account Module

## Account List Page

- [ ] Connect `GET /account`
- [ ] Display account table
- [ ] Loading state
- [ ] Error handling

### API
```http
GET /account
```

---

## Create Account

- [ ] Create account form UI
- [ ] Connect `POST /account`
- [ ] Validation
- [ ] Success notification
- [ ] Refresh account list

### API
```http
POST /account
```

---

## Account Details

- [ ] Create account details page
- [ ] Connect `GET /account/{id}`
- [ ] Handle missing account

### API
```http
GET /account/{id}
```

---

## Delete Account

- [ ] Add delete action
- [ ] Confirmation modal
- [ ] Connect `DELETE /account/{id}`
- [ ] Refresh list

### API
```http
DELETE /account/{id}
```

---

# Staff Module

## Staff List Page

- [ ] Connect `GET /staff`
- [ ] Display staff table
- [ ] Loading state
- [ ] Error handling

### API
```http
GET /staff
```

---

## Create Staff

- [ ] Create staff form
- [ ] Connect `POST /staff`
- [ ] Validation
- [ ] Success notification

### API
```http
POST /staff
```

---

## Staff Details

- [ ] Connect `GET /staff/{id}`
- [ ] Create details page
- [ ] Handle invalid id

### API
```http
GET /staff/{id}
```

---

## Delete Staff

- [ ] Add delete action
- [ ] Confirmation modal
- [ ] Connect `DELETE /staff/{id}`

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
