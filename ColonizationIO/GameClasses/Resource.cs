using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace ColonizationIO.GameClasses
{
    [XmlRoot("Resources")]
    public class ResourceList
    {
        [XmlElement("Resource")]
        public List<Resource> Resources { get; set; }
    }
    public class Resource
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
    }
}
