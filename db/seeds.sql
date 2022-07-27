USE employee_db;

INSERT INTO DEPARTMENT(id, department_id)
VALUES  (001, "sales")
        (002, "Engineering")
        (003, "Finance")
        (004, "Legal")






INSERT INTO ROLES (id, title, salary, department_id)
VALUES  (001, "area manager", 5000000.00, 001)
        (002, "sales person", 120000.00, 001)
        (003, "lead engineer". 123213.00, 002)
        (004, "legal team lead", 543543.00, 004)


INSERT INTO EMPLOYEES (id, first_name, last_name, role_id, manager_id)
VALUES  (001, "bob", "smith", 001, NULL)
        (002, "alan", "john", 002, 001)
        (003, "john", "bob", 003, 001)
        (004, "smith", "alan". 004, 001)

