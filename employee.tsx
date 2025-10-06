import React, { useEffect, useState } from "react";

type Employee = {
    id: number;
    name: string;
    email: string;
    position: string;
};

const mockFetchEmployees = async (): Promise<Employee[]> => [
    { id: 1, name: "John Doe", email: "john@example.com", position: "Developer" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", position: "Designer" },
];

const EmployeeComponent: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState<Partial<Employee>>({});

    useEffect(() => {
        mockFetchEmployees().then(setEmployees);
    }, []);

    const handleEdit = (emp: Employee) => {
        setEditingId(emp.id);
        setForm(emp);
    };

    const handleDelete = (id: number) => {
        setEmployees((prev) => prev.filter((e) => e.id !== id));
        if (editingId === id) setEditingId(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = () => {
        setEmployees((prev) =>
            prev.map((e) => (e.id === editingId ? { ...e, ...form } as Employee : e))
        );
        setEditingId(null);
        setForm({});
    };

    return (
        <div>
            <h2>Employee List</h2>
            <ul>
                {employees.map((emp) => (
                    <li key={emp.id}>
                        {editingId === emp.id ? (
                            <div>
                                <input
                                    name="name"
                                    value={form.name || ""}
                                    onChange={handleChange}
                                    placeholder="Name"
                                />
                                <input
                                    name="email"
                                    value={form.email || ""}
                                    onChange={handleChange}
                                    placeholder="Email"
                                />
                                <input
                                    name="position"
                                    value={form.position || ""}
                                    onChange={handleChange}
                                    placeholder="Position"
                                />
                                <button onClick={handleUpdate}>Update</button>
                                <button onClick={() => setEditingId(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                {emp.name} | {emp.email} | {emp.position}
                                <button onClick={() => handleEdit(emp)}>Edit</button>
                                <button onClick={() => handleDelete(emp.id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeComponent;