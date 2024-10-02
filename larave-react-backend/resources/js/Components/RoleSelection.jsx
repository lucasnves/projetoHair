import React from 'react';

const roles = [
    { value: 'user', label: 'Usuário' },
    { value: 'hairdresser', label: 'Cabeleleiro' },
    { value: 'company', label: 'Empresa' }
];

const RoleSelection = ({ selectedRole, onRoleChange }) => {
    return (
        <div className="flex justify-between w-full">
            {roles.map((item, key) => (
                <button
                    key={key}
                    type="button"
                    className={`border p-2 rounded ${selectedRole === item.value ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                    onClick={() => onRoleChange(item.value)}
                >
                    {item.label}
                </button>
            ))}
        </div>
    );
};

export default RoleSelection;
