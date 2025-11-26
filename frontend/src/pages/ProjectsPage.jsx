import { useEffect, useMemo, useState } from 'react';
import { api, STUDENT_KEY } from '../api/client';

const initialForm = {
	name: '',
	student_name: '',
	description: '',
	status: 'pending',
};

export default function ProjectsPage() {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [form, setForm] = useState(initialForm);
	const [statusFilter, setStatusFilter] = useState('');

	const filteredUrl = useMemo(() => {
		const params = new URLSearchParams();
		if (statusFilter) params.set('status', statusFilter);
		const qs = params.toString();
		return `projects/${qs ? `?${qs}` : ''}`;
	}, [statusFilter]);

	const loadProjects = async () => {
		setLoading(true);
		setError('');
		try {
			const { data } = await api.get(filteredUrl);
			setProjects(data);
		} catch (err) {
			setError(err.message || 'Error al cargar proyectos');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadProjects();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filteredUrl]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');
		try {
			await api.post('projects/', form);
			setForm(initialForm);
			setSuccess('Proyecto creado correctamente');
			await loadProjects();
		} catch (err) {
			setError(err.message || 'Error al crear proyecto');
		}
	};

	return (
		<div style={{ maxWidth: 900, margin: '0 auto', padding: 24, position: 'relative' }}>
			<div style={{ position: 'fixed', top: 10, right: 10, background: '#f4f4f4', border: '1px solid #ddd', padding: '6px 10px', borderRadius: 6, fontSize: 12 }}>
				Clave: <strong>{STUDENT_KEY}</strong>
			</div>
			<h1>Proyectos</h1>

			<div style={{ marginBottom: 16 }}>
				<label style={{ marginRight: 8 }}>
					Filtro por estado:{' '}
					<select
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
					>
						<option value=''>Todos</option>
						<option value='pending'>pending</option>
						<option value='in_review'>in_review</option>
						<option value='approved'>approved</option>
					</select>
				</label>
				<button onClick={() => loadProjects()}>Refrescar</button>
			</div>

			<form onSubmit={handleSubmit} style={{ marginBottom: 24, display: 'grid', gap: 12 }}>
				<h2>Crear proyecto</h2>
				<input
					name='name'
					placeholder='Nombre del proyecto'
					value={form.name}
					onChange={handleChange}
					required
				/>
				<input
					name='student_name'
					placeholder='Nombre del estudiante'
					value={form.student_name}
					onChange={handleChange}
					required
				/>
				<textarea
					name='description'
					placeholder='Descripción (opcional)'
					value={form.description}
					onChange={handleChange}
					rows={3}
				/>
				<select name='status' value={form.status} onChange={handleChange}>
					<option value='pending'>pending</option>
					<option value='in_review'>in_review</option>
					<option value='approved'>approved</option>
				</select>
				<button type='submit'>Guardar</button>
			</form>

			{loading && <p>Cargando...</p>}
			{error && <p style={{ color: 'crimson' }}>{error}</p>}
			{success && <p style={{ color: 'green' }}>{success}</p>}

			<ul style={{ listStyle: 'none', padding: 0 }}>
				{projects.map((p) => (
					<li key={p.id} style={{ border: '1px solid #ddd', padding: 12, marginBottom: 12, borderRadius: 8 }}>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<strong>{p.name}</strong>
							<span>{new Date(p.created_at).toLocaleString()}</span>
						</div>
						<div>Estudiante: {p.student_name}</div>
						<div>Estado: {p.status}</div>
					</li>
				))}
			</ul>

			{!loading && projects.length === 0 && !error && (
				<p>No hay proyectos.</p>
			)}
		</div>
	);
}

