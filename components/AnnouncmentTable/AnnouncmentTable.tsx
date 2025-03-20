import AnnouncmentCard from "../AnnouncmentCard/AnnouncmentCard";


const AnnouncmentTable = () => {
    
    
      return (
        <div className="max-w-3xl mx-auto p-4">
          <ul className="space-y-4">
            <AnnouncmentCard />
            <AnnouncmentCard />
          </ul>
        </div>
      );
  
}

export default AnnouncmentTable
