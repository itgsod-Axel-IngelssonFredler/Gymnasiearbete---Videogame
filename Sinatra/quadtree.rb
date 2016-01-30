class QuadTree
	attr_accessor :content

	def initialize(array,width,height)
		@content = array
		@max_objects = 2
		@quadrants = [Node.new([]),Node.new([]),Node.new([]),Node.new([])]

	end	

	def generateTree()
		@quadrants.each do |quadrant|
			searchContents(quadrant)
		end

	end

	def searchContents(node)
		node.content.each do |item|
			if item.class == Node
				p "Found a child node"
				searchContents(item)
			else
				#p item
			end
		end

	end
end

class Node
	attr_accessor :content
	def initialize(content)
		@content = content

	end

end

array = (1..7).to_a

quadtree = QuadTree.new(array,500,500)
quadtree.generateTree
