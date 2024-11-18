import './Sidebar.scss';

interface SidebarButtonProps {
    upButtons: React.ReactNode;
    downButtons: React.ReactNode;
}
export default function Sidebar({ upButtons, downButtons }: SidebarButtonProps) {
    return (
        <ul className="cj-sidebar">
            <div>
                {upButtons}
            </div>

            <div>
                {downButtons}
            </div>
        </ul>
    );
}