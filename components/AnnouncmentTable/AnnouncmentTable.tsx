import AnnouncmentCard from "../AnnouncmentCard/AnnouncmentCard";


const AnnouncmentTable = () => {
    
    
      return (
        <div className="max-w-7xl mx-auto p-4">
          <ul className="space-y-3">
            <AnnouncmentCard />
            <AnnouncmentCard />
          </ul>
        </div>
      );
  
}

export default AnnouncmentTable
