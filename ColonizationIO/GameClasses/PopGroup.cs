using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace ColonizationIO.GameClasses
{
    [XmlRoot("PopGroups")]
    public class PopGroupList
    {
        [XmlElement("PopGroup")]
        public List<PopGroup> PopGroups { get; set; }
    }
    public class PopGroup
    {
        public int ID { get; set; }
        public string Type { get; set; }
        public List<Consumption> BasicNeeds { get; set; }
        public List<Consumption> BasicWants { get; set; }
        public List<Consumption> LuxuryWants { get; set; }
    }
}
