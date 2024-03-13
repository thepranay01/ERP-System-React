export default function DashboardCard(props: { data: string | number, title: string }) {
    const { data, title } = props;

    return <div className="h-44 border-solid rounded-md border-white border flex flex-col hover:bg-nav-hover-bg transition-all">
        <div className="flex items-center justify-center grow text-5xl text-center">{data}</div>
        <div className="text-center py-1">{title}</div>
    </div>
}